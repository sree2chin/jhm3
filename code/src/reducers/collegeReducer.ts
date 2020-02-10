
const intitalState = {
    collegesList: [
        {
            name: "ihm",
            establishedYear: "1989",
            affiliatedUniversity: "JNTU",
            seatAlloted: "4",
            course: "hotel management",
            location: "hyd",
            bannerImage: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/download.jpeg",
            logo: "",
            contactNumber: "9123456789",
            website: "http://www.ihmhyd.org/",
            emailId: "ihm@gmail.com",
        },
        {
            name: "ihm-d",
            establishedYear: "1989",
            affiliatedUniversity: "Nehru university",
            seatAlloted: "100",
            course: "hotel management",
            location: "Delhi",
            bannerImage: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/ihm-hyd.jpg",
            logo: "",
            contactNumber: "9123456789",
            website: "http://www.ihmhyd.org/",
            emailId: "ihm-d@gmail.com",
        },
        {
            name: "ihm",
            establishedYear: "1989",
            affiliatedUniversity: "JNTU",
            seatAlloted: "4",
            course: "hotel management",
            location: "hyd",
            bannerImage: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/download.jpeg",
            logo: "",
            contactNumber: "9123456789",
            website: "http://www.ihmhyd.org/",
            emailId: "ihm@gmail.com",
        },
        {
            name: "ihm-d",
            establishedYear: "1989",
            affiliatedUniversity: "Nehru university",
            seatAlloted: "100",
            course: "hotel management",
            location: "Delhi",
            bannerImage: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/ihm-hyd.jpg",
            logo: "",
            contactNumber: "9123456789",
            website: "http://www.ihmhyd.org/",
            emailId: "ihm-d@gmail.com",
        },
        {
            name: "ihm",
            establishedYear: "1989",
            affiliatedUniversity: "JNTU",
            seatAlloted: "4",
            course: "hotel management",
            location: "hyd",
            bannerImage: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/download.jpeg",
            logo: "",
            contactNumber: "9123456789",
            website: "http://www.ihmhyd.org/",
            emailId: "ihm@gmail.com",
        }
    ]
};

const student = [
    {
        name: "",
        contactNumber: "",
        education: "",
        interestedCourse: "",
        interestedLocation: "",
        location: "",
        joiningYear: ""
    }
]

export default (state = intitalState, action) => {
  switch (action.type) {
    case 'GET_COLLEGES_LIST':
      return {
        collegesList: action.payload
      };
    default:
      return state;
  }
};

