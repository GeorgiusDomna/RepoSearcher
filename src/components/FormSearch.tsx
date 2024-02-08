import { FormEvent, useState } from 'react'

interface IFormSearchProps {
  search: (repoName: string) => Promise<void>;
}

const FormSearch: React.FC<IFormSearchProps> = ({search}) => {
  const [repoName, setRepoName] = useState('');

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(repoName);
  }

  return (
    <form onSubmit={handelSubmit} className='searchForm'>
      <input
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder='enter the name of the repository'
        type="text" />
      <button disabled={!repoName}>Search repo</button>
    </form>
  )
}

export default FormSearch