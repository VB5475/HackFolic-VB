import React, { useEffect, useState } from "react";
import Animation from "../../common/Animation/Animation";
import ViewDetailsAnimation from "../../../utils/ViewDetailsPage/ViewDetailAnimation.json";
import EventDetailsIcon from "../../../utils/ViewDetailsPage/Olympic Torch.json";
import PrizePoolAnimation from "../../../utils/ViewDetailsPage/PrizeAnimation.json";
import PerksAnimation from "../../../utils/ViewDetailsPage/Perks Animation.json";
import { Button } from "../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generalThunkFunction } from "../../../redux/actions/Genralactions";
import { formatDate } from "../../../redux/actions/Genralactions";

function DetailsBlock({ details }) {
  return (
    <div className="w-full mt-5">
      {details.map((detail, index) => (
        <div className="flex items-start mt-8 space-x-3" key={index}>
          <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-transparent rounded-md w-16 h-11">
            <Animation path={detail.icon.path} width={detail.icon.width} height={detail.icon.height} />
          </div>
          <div>
            <h4 className="text-xl font-medium text-gray-800 border-b-2 border-green-500 w-fit pb-1">{detail.title}</h4>
            {index === 2 ? (
              <ul className="mt-1 text-gray-500 ">
                {detail.subDetails.map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-gray-500 ">
                <ul>
                  {detail.subDetails.map((subDetail, idx) => (
                    <li key={idx}>
                      {subDetail.title}: {subDetail.Description}
                    </li>
                  ))}
                </ul>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ViewDetailsPage() {
  const [hackathonDetails, setHackathonDetails] = useState([]);
  const generalState = useSelector((state) => state.generalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hackathonId } = useParams();

  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
  }, []);

  useEffect(() => {
    const hackathon = generalState.hackathons.find((hackathon) => hackathon.id === hackathonId);
    console.log(hackathon);
    if (hackathon) {
      setHackathonDetails(hackathon);
    }
  }, [generalState]);


  let detail ;

  if (hackathonDetails && Object.keys(hackathonDetails).length > 0) {
    detail = [
      {
        title: "Event Details",
        icon: { path: EventDetailsIcon, width: "65%", height: "100%" },
        subDetails: [
          {
            title: "Registrations",
            Description: `From: ${formatDate(hackathonDetails.dates.registrationStart)} Till :${formatDate(
              hackathonDetails.dates.registrationEnd
            )} `,
          },
          {
            title: "Event",
            Description: `From: ${formatDate(hackathonDetails.dates.hackathonStart)} Till :${formatDate(
              hackathonDetails.dates.hackathonEnd
            )} `,
          },
          { title: "Mode", Description: `${hackathonDetails.mode}` },
          { title: "Venue", Description: `${hackathonDetails.location}` },
          {
            title: "teamSize",
            Description: `Minimum: ${hackathonDetails.teamSize.min} Maximum: ${hackathonDetails.teamSize.max}`,
          },
          { title: "Theme", Description: `${hackathonDetails.techstacks}` },
        ],
      },
      {
        title: "Prize Pool",
        icon: { path: PrizePoolAnimation, width: "110%", height: "100%" },
        subDetails: [
          {
            title: "Prize",
            Description: `${hackathonDetails.prizes && hackathonDetails.prizes.prizePool !== undefined
              ? hackathonDetails.prizes.prizePool
              : "not defined"}`,
          },
        ]
        },
      {
        title: "Exclusive Perks",
        icon: { path: PerksAnimation, width: "110%", height: "100%" },
        subDetails: hackathonDetails.prizes && Array.isArray(hackathonDetails.prizes.perks)
        ? hackathonDetails.prizes.perks
        : ["no other perks"],
      },
    ];
  }
  else{

detail = [
  {
    title: "Event Details",
    icon: { path: EventDetailsIcon, width: "65%", height: "100%" },
    subDetails: [
      {
        title: "Registrations",
        Description: `From:  Till : `,
      },
      {
        title: "Event",
        Description: `From:  Till :`,
      },
      { title: "Mode", Description: `` },
      { title: "Venue", Description: `` },
      {
        title: "teamSize",
        Description: `Minimum:  Maximum: `,
      },
      { title: "Theme", Description: `` },
    ],
  },
  {
    title: "Prize Pool",
    icon: { path: PrizePoolAnimation, width: "110%", height: "100%" },
    subDetails: [{ title: "Prize", Description: `` }],
  },
  {
    title: "Exclusive Perks",
    icon: { path: PerksAnimation, width: "110%", height: "100%" },
    subDetails: [],
  },
]

  }

  return (
    <>
      <div className="container flex flex-col lg:flex-row p-8 justify-center items-center lg:h-full mx-auto  lg:gap-10   w-full ">
        <div className="flex items-center justify-center w-full lg:w-auto ">
          <Animation path={ViewDetailsAnimation} width="100%" height="100%" />
        </div>
        <div className="flex flex-wrap items-center w-full lg:w-fit  p-3 md:p-5 ">
          <div className=" w-full ">
            <div className="flex flex-col w-full ">
              <h3 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight md:text-4xl border-b-4 border-green-500 w-fit pb-1 ">
                Hackathon Name
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl  ">
                {hackathonDetails?hackathonDetails.description:"no description"}
              </p>
            </div>
            <DetailsBlock details={detail} />

            {hackathonDetails && hackathonDetails.hackathonStatus && hackathonDetails.hackathonStatus.toUpperCase() === "UPCOMING" ? null : (
  <div className="ml-[75px] md:mx-auto my-10 w-fit">
    <Button
      onClick={() => navigate(`/applyNow/${hackathonId}`)}
      variant="primary"
      buttonStyle="m-0 bg-blue-500 font-bold py-4 px-6"
    >
      {hackathonDetails && hackathonDetails.hackathonStatus && hackathonDetails.hackathonStatus.toUpperCase() === "CLOSED"
        ? "See Projects"
        : "Apply Now"}
    </Button>
  </div>
)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetailsPage;
