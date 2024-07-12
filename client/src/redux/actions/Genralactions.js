import { getMethod, postMethod } from "../../utils/axiosInstance/axiosInstance";
import { getUsers } from "../../utils/axiosInstance/axiosInstance";


export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};


const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // Month is zero-based, so we add 1
    day: now.getDate()
  };
};

// const compareDates = (dateString, comparisonType) => {
//   const currentDate = getCurrentDate();
//   const givenDate = {
//     year: parseInt(dateString.substring(0, 4)),
//     month: parseInt(dateString.substring(5, 7)),
//     day: parseInt(dateString.substring(8, 10))
//   };

//   const currentDateValue = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
//   const givenDateValue = givenDate.year * 10000 + givenDate.month * 100 + givenDate.day;

//   if (comparisonType === "equal") {
//     return currentDateValue === givenDateValue;
//   } else if (comparisonType === "greaterThan") {
//     return currentDateValue < givenDateValue;
//   } else if (comparisonType === "lessThan") {
//     return currentDateValue > givenDateValue;
//   } else {
//     throw new Error("Invalid comparison type");
//   }
// };


const compareDates = (dateString, comparisonType) => {
  const currentDate =parseInt(getCurrentDate());
  console.log(typeof currentDate)
  const givenDate = {
    year: parseInt(dateString.substring(0, 4)),
    month: parseInt(dateString.substring(5, 7)),
    day: parseInt(dateString.substring(8, 10))
  };

  const currentDateValue = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
  const givenDateValue = givenDate.year * 10000 + givenDate.month * 100 + givenDate.day;

  if (comparisonType === "equal") {
    return currentDateValue === givenDateValue;
  } else if (comparisonType === "greaterThan") {
    return currentDateValue < givenDateValue;
  } else if (comparisonType === "lessThan") {
    return currentDateValue > givenDateValue;
  } else {
    throw new Error("Invalid comparison type"); // This error is thrown when the comparison type is invalid
  }
};
console.log(compareDates("2024-06-03", "greaterThan")); // true
console.log(compareDates("2024-04-11", "equal")); // true




export function workSuccess(value=false){
  return value;
}

export function getParticipantsAction(participantsData) {
  return {
    type: "SET-ALL-PARTICIPANTS",
    payload: participantsData,
  };
}

export function getHostsAction(hostsData) {
  return {
    type: "SET-ALL-HOSTS",
    payload: hostsData,
  };
}

export function getHackathonsAction(hackathonsData) {
  return {
    type: "SET-ALL-HACKATHONS",
    payload: hackathonsData,
  };
}

export function getHackathonsApplicationsAction(hackathonsApplicationsData) {
  return {
    type: "SET-ALL-HACKATHONS-APPLICATIONS",
    payload: hackathonsApplicationsData,
  };
}

export function generalThunkFunction(methodName, data) {
  let result;
  return async function (dispatch) {
    switch (methodName) {
      case "getAllParticipants":
        result = await getUsers(
          "participants",
          "http://localhost:8000/participants"
        );
        console.log(result.data);
        if (result.success) {
          dispatch(getParticipantsAction(result.data));
        }

        break;
      case "getAllHosts":
        result = await getUsers("hosts", "http://localhost:8000/hosts");
        if (result.success) {
          dispatch(getHostsAction(result.data));
        }

        break;
        case "getAllHackathons":
          result = await getUsers("hosts", "http://localhost:8000/hackathons");
          if (result.success) {
            const currentDate = getCurrentDate(); // Define currentDate here
        
            console.log(result.data);
        
            const newResult = result.data.map((hackathon) => {
              const registrationStart = hackathon.dates.registrationStart;
              const registrationEnd = hackathon.dates.registrationEnd;
              const hackathonStart = hackathon.dates.hackathonStart;
              const hackathonEnd = hackathon.dates.hackathonEnd;
        
              if (
                compareDates(registrationStart,  "lessThan") &&
                compareDates(registrationEnd, "greaterThan")
              ) {
                return { ...hackathon, hackathonStatus: "Open" };
              } else if (compareDates( registrationStart, "lessThan")) {
                return { ...hackathon, hackathonStatus: "UpComing" };
              } else if (compareDates( registrationEnd, "lessThan")) {
                return { ...hackathon, hackathonStatus: "RegistrationClosed" };
              } else if (
                compareDates( hackathonStart, "equal") ||
                (compareDates(hackathonStart,  "greaterThan") &&
                  compareDates(hackathonEnd,"lessThan"))
              ) {
                return { ...hackathon, hackathonStatus: "Running" };
              } else if (compareDates( hackathonEnd, "lessThan")) {
                return { ...hackathon, hackathonStatus: "Closed" };
              } else {
                return hackathon; // Return the hackathon object unchanged
              }
            });
        
            console.log(newResult);
        
            dispatch(getHackathonsAction(newResult));
          }
          break;
        
      case "getAllHackathonsApplications":
        result = await getUsers(
          "hackathonApplications",
          "http://localhost:8000/hackathonApplications"
        );

        console.log(result)
        if (result.success) {
          dispatch(getHackathonsApplicationsAction(result.data));
        }

        break;

      case "AddNewHackathon":
       
console.log(data.id);
        const newHackathonDetails = {
          id: data.id,
          hackathonStatus: data.status,
          hostId: "1",
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          prizes: {
            prizePool: data.prizes,
            perks: data.perks,
          },
          techstacks: data.techstacks,
          dates: {
            registrationStart: data.registrationStart,
            registrationEnd: data.registrationEnd,
            hackathonStart: data.hackathonStart,
            hackathonEnd: data.hackathonEnd,
          },
          teamSize: {
            max: data.teamMax,
            min: data.teamMin,
          },

          mode: data.mode,
          location: data.location,
        };
        console.log(newHackathonDetails.id)

        result = await postMethod(
          
          "http://localhost:8000/hackathons", JSON.stringify(newHackathonDetails)
        );
        console.log(result);
        if (result.success) {
          workSuccess(true);
         
        }
        break;

        case "addHackathonApplication":
  
        
        
        const newHackathonApplication = {
          
            id: data.id,
            hackathonId: data.hackathonId,
            hackathonName: data.hackathonName,
            applicationStatus: "pending",
            leaderId: data.leaderId,
            leadeName:data.name,
            teamDetails:data.teamDetails,
            problemStatementAbstract: data.problemStatementAbstract,
            solutionStatement: "",
            technologyUsed: data.technologyUsed
          
        }
        console.log(newHackathonApplication.id)

        result = await postMethod(
          
          "http://localhost:8000/hackathonApplications", JSON.stringify(newHackathonApplication)
        );
        console.log(result);
        // if (result.success) {
        //   workSuccess(true);
         
        // }
        break;





      // if (result.success === true) dispatch(setRole(result.data, role));

      default:
        break;
    }
  };
}
