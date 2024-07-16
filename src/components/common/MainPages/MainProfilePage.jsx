import React from "react";
import Animation from "../Animation/Animation";
import MaleAnimation from "../../../utils/Profile Page/Male Avatar.json";
import FemaleAnimation from "../../../utils/Profile Page/Female Avatar.json";
import HostAnimation from "../../../utils/Profile Page/HostAnimation.json";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/actions/RegisterLoginActions";
function MainProfilePage({ name, tagline, designation, about, role, gender,email,id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(role)

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 pt-10 pb-20  mx-auto ">
          <div className="lg:w-4/5 mx-auto flex flex-col  shadow-lg shadow-blue-500 rounded-md p-10">
            <Animation
              path={
                gender === "male"
                  ? MaleAnimation
                  : gender === "female"
                  ? FemaleAnimation
                  : HostAnimation
              }
              width="50%"
              height="100%"
            />
            <div className="lg:w-auto w-full lg:px-10 lg:py-6 mt-6 lg:mt-1 lg:mx-auto text-center    ">
              <div className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-2 border-b-2 border-green-500 w-fit mx-auto ">
                {name}
              </div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                {role.toLowerCase() === "host" ? `Tagline : ${tagline}` : `Designation : ${designation}` }
              </h2>
              <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                {role.toLowerCase() === "host" || role.toLowerCase()==="participant" ?  `Email : ${email}` : null  }
              </h2>
              {role.toLowerCase() === "participant" ? (
                <>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                    Gender : {gender}
                  </h2>
                </>
              ) : null}

              <p className="leading-relaxed  ">About : {about}</p>

              <div className="flex flex-col md:flex-row justify-center gap-1 mt-5">
                {role.toLowerCase() === "host" && (
                  <>
                    <Button
                      variant="green"
                      buttonStyle="m-0 bg-green-500 font-bold py-4"
                      onClick={() => navigate(`/HostDashBoard/${id}`)}
                    >
                      {role.toLowerCase()} Dashboard
                    </Button>
                    <Button
                      onClick={() => navigate(`/addNewHackathon`)}
                      variant="primary"
                      buttonStyle="m-0 bg-blue-500 font-bold py-4"
                    >
                      Add New Hackathon
                    </Button>
                    <Button
                      onClick={() => navigate(`/HostApplicationsDashBoard/${id}`)}
                      variant="primary"
                      buttonStyle="m-0 bg-gray-500 font-bold py-4 hover:bg-gray-600"
                    >
                      See Applications
                    </Button>
                  </>

                )}
                {role.toLowerCase() === "admin" && (
                  <>
                    <Button
                      variant="green"
                      buttonStyle="m-0 bg-green-500 font-bold py-4"
                      onClick={() => navigate(`/AdminDashBoard`)}
                    >
                       {role.toLowerCase()} Dashboard 
                    </Button>

                    <Button
                      variant="green"
                      buttonStyle="m-0 bg-yellow-500 font-bold py-4"
                      onClick={() => navigate(`/addNewUser`) }
                    >
                    Add New User
                    </Button>

                    <Button
                      onClick={() => navigate(`/addNewHackathon`)}
                      variant="primary"
                      buttonStyle="m-0 bg-blue-500 font-bold py-4"
                    >
                      Add New Hackathon
                    </Button>
                  </>
                )}
                {role.toLowerCase() === "participant" && (
                  <Button
                    variant="green"
                    buttonStyle="m-0 bg-green-500 font-bold py-4  "
                    onClick={() =>
                      navigate(`/ParticipantDashBoard/${id}`)
                    }
                  >
                    {role.toLowerCase()} Dashboard
                  </Button>
                )}

                <Button
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                  variant="danger"
                  buttonStyle=" m-0 font-bold py-4 px-14 "
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainProfilePage;
