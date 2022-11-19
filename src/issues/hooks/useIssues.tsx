import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers/sleep';


interface Props {
  state?: State,
  labels: string[],
}

const getIssues = async (labels: string[] = [], state?: State):Promise<Issue[]> => {
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }
  params.append('page', '1');
  params.append('per_page', '5');
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(
    ['issues', { state, labels }],
    () => getIssues(labels, state),
  );
  return { issuesQuery };
};