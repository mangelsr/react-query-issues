import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces";
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep();
  const { data } = await githubApi.get<Label[]>('/labels', {
    headers: {
      Authorization: null,
    },
  });
  return data;
};

// initialData != placeholderData
// placeholderData: data show meanwhile the first data fetch is working
// initialData: considered as fresh data may cause problem if it is imcomplete

export const useLabels = () => {
  const labelsQuery = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
      placeholderData: [
        {
          id: 725156255,
          node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
          name: "good first issue (taken)",
          color: "b60205",
          default: false,
        },
        {
          id: 717031390,
          node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
          name: "good first issue",
          color: "6ce26a",
          default: true
        },
      ],
    },
  );
  return labelsQuery;
};