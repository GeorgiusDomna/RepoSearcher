import { IResponseData } from "../interfaces/IResponseData";

const token = import.meta.env.VITE_TOKEN;

export const fetchData = async (repoName: string, after: string): Promise<IResponseData | undefined> => {
  const query = `{
    search(query: "${repoName}", first: 10, ${after && `after: "${after}",`} type: REPOSITORY) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      repositoryCount
      edges {
        node {
          ... on Repository {
            createdAt
            description
            id
            name
            updatedAt
            url
          }
        }
      }
    }
  }`;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({query})
    });
    const { data: { search } } = await res.json();
    return search;
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Произошла ошибка: ${err.message}`);
    } else {
      console.error(`Произошла неизвестная ошибка: ${err}`);
    }
  }
}