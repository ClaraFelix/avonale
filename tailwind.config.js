const { join } = require("path");

module.exports = {
  content: [join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}")],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A78BFA",
          secondary: "#C4B5FD",
          neutral: "#DDD6FE",
          text: "#4C1D95",
          body: "#FFFFF",
        },
      },
    ],
  },
  extend: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      mono: ["Roboto", "sans-serif"],
    },
    cursor: {
      grab: "grab",
      grabbing: "grabbing",
    },
  },
};
