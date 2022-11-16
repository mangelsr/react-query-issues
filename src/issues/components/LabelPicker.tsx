import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels"


export const LabelPicker = () => {
  const labelsQuery = useLabels();
  
  // isLoading != isFetching
  // isLoading only for initial data fetch
  // isFetching everytime the data is being fetched
  if (labelsQuery.isLoading) {
    return (<LoadingIcon />);
  }
  
  return (
    <>
      {
        labelsQuery.data?.map(label => (
          <span
            key={ label.id } 
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            { label.name }
          </span>
        ))
      } 
    </>
  )
}
