import { FormEvent, useEffect, useState } from 'react'
import RepoItem from './components/RepoItem';
import { fetchData } from './api/documentService'
import { numberFormater } from './utils/numberFormater';
import { ExtendedPageInfo, IRepoInfo } from './interfaces/IResponseData';
import './App.css'

const App: React.FC = () => {
  const [pageInfo, setPageInfo] = useState<ExtendedPageInfo<{ repoCount: number }>>();
  const [repoList, setRepoList] = useState<IRepoInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [repoName, setRepoName] = useState('');
  const [nextPage, setNextPage] = useState('');

  const search = async (repoName: string, isInit: boolean) => {
    const res = await fetchData(repoName, isInit ? '' : nextPage);
    if (res) {
      setPageInfo({ ...res.pageInfo, repoCount: res.repositoryCount });
      setNextPage(res.pageInfo.endCursor)
      setRepoList(
        isInit
          ? res.edges
          : [...repoList, ...res.edges]);
      setIsLoading(false);
    }
  };

  const scrollHandler = () => {
    if (window.document.documentElement.scrollHeight - (window.document.documentElement.scrollTop + window.innerHeight) < 100) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    (isLoading && repoName) && search(repoName, false);
  }, [isLoading])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler);
  }, [])

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(repoName, true);
  }

  return (
    <div className='App'>
      <form onSubmit={(event) => handelSubmit(event)} className='searchForm'>
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder='enter the name of the repository'
          type="text" />
        <button disabled={!repoName}>Search repo</button>
      </form>
      <div className="content">
        {pageInfo && <div className="foundCounter">{`${numberFormater(pageInfo.repoCount)} repo found`}</div>}
        <div className="list">
          {repoList &&
            repoList.map((repo) => {
              return <RepoItem key={repo.node.id} repoItem={repo} />
          })}
        </div>
      </div>
    </div>
  )
}

export default App