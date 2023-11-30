import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactiveButton from "reactive-button";
import FullWidthTabs3 from "./Content-tab";
import BasicSelect from "./Content-tab";

const ContentManagement = () => {
    const [state, setState] = useState('idle');
    const navigate = useNavigate();
   // console.log(10)
    const onClickHandler = () => {
      setState('loading');
      //navigate('add-blog')
  
      // send an HTTP request
      setTimeout(() => {
        setState('success');
      }, 2000);
    };
    return (
        <div>
            <Link to={'add-blog'}>            <h2>content</h2>
</Link>
            <div className="flex justify-end px-10">
                    <div>
               <Link to={'add-blog'}>     <ReactiveButton
      buttonState={state}
      idleText="add blog"
      loadingText="Loading"
      successText="Done"
      onClick={onClickHandler}
    /></Link>
                 
                    </div>

        </div>
        {
            BasicSelect()
        }



        </div>
    );
};

export default ContentManagement;