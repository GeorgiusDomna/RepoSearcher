import { formatDate } from "../utils/dataFormater";
import { IRepoInfo } from "../interfaces/IResponseData";

interface RepoItemProps {
  repoItem: IRepoInfo;
}

const RepoItem = ({ repoItem }: RepoItemProps) => {
  const repo = repoItem.node;

  return (
    <div className="repoItem">
      <h1 className="repoItem_title">
        {repo.name}
      </h1>
      {repo.description &&
        <div className="repoItem_disc">
        <h3 className="repoItem_subTitle">discription:</h3>
        <p>{repo.description}</p>
      </div>}
      <div className="repoItem_date">
        <h3 className="repoItem_subTitle">date:</h3>
        <p><b>create:</b> {formatDate(repo.createdAt)}</p>
        <p><b>update:</b> {formatDate(repo.updatedAt)}</p>
      </div>
      <div>
        <h3 className="repoItem_subTitle">link to the git repo:</h3>
        <a
          href={repo.url}
          target='_blank'
          rel='noreferrer'>
          {repo.url}
        </a>
      </div>
    </div>
  )
}

export default RepoItem;