/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ['"Poppins"', "serif"],
      grotesk: ['"Space Grotesk"', "serif"],
    },
    colors: {
      "button-light-color": "#5964e0",
      white: "#ffffff",
      black: "#000000",
      subBlack: "#1a1a1a",
    },
    extend: {
      backgroundImage: {
        "header-bg": "url('./assets/main-header.jpg')",
        "works-bg": "url('./assets/works-bg.jpg')",
        "logo-bg": "url('./assets/logo.jpg')",
        "forbidden-bg": "url('./assets/forbidden-bg.jpg')",
        "contact-bg": "url('./assets/contact.jpg')",
        "join-bg": "url('./assets/join-bg.jpg')",
        "about-bg": "url('./assets/about-one.jfif')",
        "blog-bg": "url('./assets/blog-header.jfif')",
        "works-gradient":
          "linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.7))",
      },
      spacing: {
        "30s": "32%",
      },
      boxShadow: {
        "light-blue": "0px 4px 10px rgba(160, 172, 247, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".custom-container": {
          width: "90%",
          margin: "0 auto",
        },
      });
    },
  ],
};
