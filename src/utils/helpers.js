import Axios from "axios";

export const exportToJson = (objectData) => {
  let filename = "export.json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" +
      contentType +
      "," +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const form = [
  {
    firstName: {
      type: "string",
      required: true,
      read_only: false,
      label: "First name",
      max_length: 30,
    },
    lastName: {
      type: "string",
      required: true,
      read_only: false,
      label: "Last name",
      max_length: 150,
    },
    email: {
      type: "email",
      required: true,
      read_only: false,
      label: "Email",
    },
    address: {
      type: "string",
      required: true,
      read_only: false,
      label: "Address",
    },
    city: {
      type: "string",
      required: true,
      read_only: false,
      label: "City",
    },
    state: {
      type: "string",
      required: true,
      read_only: false,
      label: "State",
    },
    zipCode: {
      type: "string",
      required: true,
      read_only: false,
      label: "Zip code",
    },
    country: {
      type: "autocomplete",
      required: true,
      read_only: false,
      label: "Country",
    },
  },
  {
    phoneNumber: {
      type: "string",
      required: true,
      read_only: false,
      label: "Phone number",
      max_length: 128,
    },
    accountType: {
      type: "choice",
      required: true,
      read_only: false,
      label: "Account Type",
      choices: [
        {
          value: "Current",
          display_name: "Current",
        },
        {
          value: "Savings",
          display_name: "Savings",
        },
      ],
    },
    pan: {
      type: "string",
      required: true,
      read_only: false,
      label: "Pan number",
    },
    aadhar: {
      type: "string",
      required: true,
      read_only: false,
      label: "Aadhar number",
    },
    company: {
      type: "string",
      required: true,
      read_only: false,
      label: "Current Company",
    },
  },
];
export const isMultiline = new Set(["address"]);

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const steps = ["Personal Details", "Account Details"];

export const addAccount = (userId, data) => {
  return Axios.post(
    `https://frozen-cove-32481.herokuapp.com/account/${userId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
