import React, { useEffect, useState } from "react";
import GroupButtons from "../Search-Sort-Filter/GroupButtons";
import SearchSort from "../Search-Sort-Filter/SearchSort";
import Pagination from "../Pagination/Pagination";
import MainProfilePage from "./MainProfilePage";
import MainListItem from "./MainListItem";
import Card from "../Card";
import RegisterLogin from "../../Login-Register/RegisterLogin";
import AddHackathonForm from "../../layout/HackathonPages/AddHackathonsForm";
import { useSelector, useDispatch } from "react-redux";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";
import AdminMainPage from "../../layout/AdminPages/AdminMainPage";
function MainPage({
  buttonMembers,
  currentMember,
  role,
  // paginationDataProp,
  pageName,
}) {
  console.log(pageName);
  // console.log(paginationDataProp);
  const generalState = useSelector((state) => state.generalReducer);
  const loginState = useSelector((state) => state.registerLoginReducer);
  console.log(loginState);
  const dispatch = useDispatch();
  const [hackathons, setHackathons] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [hackathonsApplications, setHackathonsApplications] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [groupButtonMembers, setGroupButtonMembers] = useState([
    "open",
    "past",
    "upComing",
  ]);
  const [activeButton, setActiveButton] = useState("open");
  const [paginationData, setPaginationData] = useState([]);
  const [searchSortFlag, setSearchSortFlag] = useState(true);
  const [paginationFlag, setPaginationFlag] = useState(true);
  const [updateFlag,setUpdateFlag] = useState(false);

  function handleUpdateFlag () {
    setUpdateFlag(!updateFlag);
  }
  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
    dispatch(generalThunkFunction("getAllParticipants"));
    dispatch(generalThunkFunction("getAllHosts"));
    dispatch(generalThunkFunction("getAllHackathonsApplications"));
  }, [updateFlag]);

  useEffect(() => {
    setHackathons(generalState.hackathons);
    setParticipants(generalState.participants);
    setHosts(generalState.hosts);
    setHackathonsApplications(generalState.hackathonApplications);
  
  }, [generalState]);
  console.log(generalState);
  console.log(hackathonsApplications);
  useEffect(() => {
    setUserRole(role);
    setGroupButtonMembers(buttonMembers);
    setActiveButton(currentMember);
  }, [buttonMembers, currentMember, role]);

  useEffect(() => {
    let newPaginationData;

    if (
      pageName === "HackathonsPage" &&
      (activeButton === "OPEN" ||
        activeButton === "CLOSED" ||
        activeButton === "UPCOMING") &&
      hackathons
    ) {
      newPaginationData = hackathons.filter((data) => {
        if (
          data.hackathonStatus &&
          typeof data.hackathonStatus === "string" &&
          data.hackathonStatus.toUpperCase() === activeButton.toUpperCase()
        ) {
          return data;
        }
      });
      setPaginationData(newPaginationData); // Update paginationData with filtered data
    } else if (pageName === "AdminMainPage" && activeButton === "HACKATHONS") {
      setPaginationData(hackathons); // Set paginationData to HACKATHONS data
    } else if (pageName === "AdminMainPage" && activeButton === "HOSTS") {
      setPaginationData(hosts); // Set paginationData to HOSTS data
    } else if (
      pageName === "AdminMainPage" &&
      activeButton === "PARTICIPANTS"
    ) {
      console.log(participants)
      setPaginationData(participants); // Set paginationData to PARTICIPANTS data
    } else if (
      pageName === "ParticipantMainPage" &&
      activeButton === "APPLIED HACKATHONS"
    ) {
      let participantAppliedHacathons = ["1", "2", "4"];

      const newAppliedHackthons = hackathons.filter(
        (hackathon) =>
          participantAppliedHacathons.includes(hackathon.id) &&
          hackathon.hackathonStatus.toUpperCase() === "OPEN"
      );

      console.log(newAppliedHackthons);

      setPaginationData(newAppliedHackthons);
    } else if (
      pageName === "ParticipantMainPage" &&
      activeButton === "PAST HACKATHONS"
    ) {
      let participantPastHackathons = ["1", "2"];

      const newPastHackthons = hackathons.filter(
        (hackathon) =>
          participantPastHackathons.includes(hackathon.id) &&
          hackathon.hackathonStatus.toUpperCase() === "CLOSED"
      );

      console.log(newPastHackthons);

      setPaginationData(newPastHackthons);
    } else if (pageName === "HostMainPage" && activeButton === "OPEN") {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const allHostHackathonIDs = loginState.roleDetails[0].hackathons;

        const hostOpenHackathons = hackathons.filter((hackathon) => {
          if (
            allHostHackathonIDs.includes(parseInt(hackathon.id)) &&
            hackathon.hackathonStatus.toUpperCase() === "OPEN"
          ) {
            return hackathon;
          }
        });

        console.log(hostOpenHackathons);
        setPaginationData(hostOpenHackathons);
      }
    } else if (pageName === "HostMainPage" && activeButton === "CLOSED") {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const allHostHackathonIDs = loginState.roleDetails[0].hackathons;

        const hostClosedHackathons = hackathons.filter((hackathon) => {
          if (
            allHostHackathonIDs.includes(parseInt(hackathon.id)) &&
            hackathon.hackathonStatus.toUpperCase() === "CLOSED"
          ) {
            return hackathon;
          }
        });

        console.log(hostClosedHackathons);
        setPaginationData(hostClosedHackathons);
      }
    } else if (pageName === "HostMainPage" && activeButton === "UPCOMING") {
      if (
        loginState &&
        loginState.roleDetails &&
        loginState.roleDetails.length > 0
      ) {
        const allHostHackathonIDs = loginState.roleDetails[0].hackathons;

        const hostUpcomingHackathons = hackathons.filter((hackathon) => {
          if (
            allHostHackathonIDs.includes(parseInt(hackathon.id)) &&
            hackathon.hackathonStatus.toUpperCase() === "UPCOMING"
          ) {
            return hackathon;
          }
        });

        console.log(hostUpcomingHackathons);
        setPaginationData(hostUpcomingHackathons);
      }
    } else if (
      pageName === "HostApplicationsPage" &&
      activeButton === "PENDING"
    ) {
      const allHostHackathonIDs = loginState.roleDetails[0].hackathons;
     
      const hostAllApplications = hackathonsApplications.filter(
        (application) => {
          if (
            allHostHackathonIDs.includes(parseInt(application.hackathonId)) &&
            application.applicationStatus.toUpperCase() === "PENDING"
          ) {
            return application;
          }
        }
      );
      setPaginationData(hostAllApplications);
    }
    else if (
      pageName === "HostApplicationsPage" &&
      activeButton === "ACCEPTED"
    ) {
      const allHostHackathonIDs = loginState.roleDetails[0].hackathons;
     
      const hostAllApplications = hackathonsApplications.filter(
        (application) => {
          if (
            allHostHackathonIDs.includes(parseInt(application.hackathonId)) &&
            application.applicationStatus.toUpperCase() === "ACCEPTED"
          ) {
            return application;
          }
        }
      );
      setPaginationData(hostAllApplications);
    }
  }, [activeButton, hackathons, hosts, participants, pageName]);

  console.log(activeButton);

  return (
    <>
      <div>
        <div className=" flex justify-center items-center my-10   ">
          <GroupButtons
            groupButtonMembers={groupButtonMembers}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>

        {searchSortFlag ? <SearchSort /> : null}

        {/* {pageToLoad(activeButton)} */}
        {/* <AddHackathonForm /> */}

        {paginationFlag ? (
          <>
            <div className=" my-10">
              <Pagination
              handleUpdateFlag={handleUpdateFlag}
                pageName={pageName}
                activeButton={activeButton}
                data={paginationData}
                recordsPerPage={10}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-fit p-5 "
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default MainPage;
