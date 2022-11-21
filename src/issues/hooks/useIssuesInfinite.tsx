import { useInfiniteQuery } from "@tanstack/react-query";

import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";
import { Issue, State } from "../interfaces";


interface Props {
  state?: State,
  labels: string[],
  page?: number,
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[],
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps):Promise<Issue[]> => {
  const [,, args] = queryKey;
  const { state, labels } = args as Props;
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }
  params.append('page', pageParam.toString());
  params.append('per_page', '5');
  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    [ 'issues', 'infinite', { state, labels, page: 1 } ],
    (data) => getIssues(data),
    {
      // TODO
      // getNextPageParam()
    },
  );
  
  return {
    issuesQuery,
  };
}
