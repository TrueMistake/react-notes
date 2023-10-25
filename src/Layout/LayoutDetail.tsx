import Detail from "../pages/Detail";
import Workspace from "../components/Workspace/Workspace";
import {useParams} from "react-router-dom";
import {useEdit} from "../context/EditProvider";

const LayoutDetail = () => {
  const {id} = useParams();
  const edit = useEdit();

  return (
    <>
      {edit?.editNote
        ? <Workspace idx={id ? id : null}/>
        : <Detail />
      }
    </>

  );
};

export default LayoutDetail;