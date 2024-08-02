import React from "react";
import AddJobForm from "./AddJobForm";
import EditJobForm from "./EditJobForm";

function Sidebar({ item, name, setOpenSidebar, openSidebar, refreshJobs }) {
  return (
    <div className="fixed w-[100vw] top-0 left-0 h-[100vh] z-[90000] ">
      <div
        onClick={() => setOpenSidebar(false)}
        className="bg-black fixed h-full opacity-[0.4] top-0 left-0 w-full "
      ></div>
      {name === "create" ? <AddJobForm setOpenSidebar={setOpenSidebar} /> :    <EditJobForm openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} refreshJobs={refreshJobs} />}
  
 
    </div>
  );
}

export default Sidebar;
