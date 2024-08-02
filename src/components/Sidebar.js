import React from "react";
import AddJobForm from "./AddJobForm";
import EditJobForm from "./EditJobForm";

<<<<<<< HEAD
function Sidebar({ item, name, setOpenSidebar, openSidebar }) {
=======
function Sidebar({ item, name, setOpenSidebar, openSidebar, refreshJobs }) {
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
  return (
    <div className="fixed w-[100vw] top-0 left-0 h-[100vh] z-[90000] ">
      <div
        onClick={() => setOpenSidebar(false)}
        className="bg-black fixed h-full opacity-[0.4] top-0 left-0 w-full "
      ></div>
<<<<<<< HEAD
      {name === "create" && <AddJobForm setOpenSidebar={setOpenSidebar} />}
      {name === "edit" && <EditJobForm setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />}
=======
      {name === "create" ? <AddJobForm setOpenSidebar={setOpenSidebar} /> :    <EditJobForm openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} refreshJobs={refreshJobs} />}
  
 
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
    </div>
  );
}

export default Sidebar;
