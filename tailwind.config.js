module.exports = {
  content: ["./App.jsx", "./src/screens/**.jsx", "./src/screens/**/**.jsx", "./src/components/**/**.jsx", "./src/components/**.jsx"],
  theme: {      
    colors: {
      black: "#000",
      white: "#FFF",

      main: '#007AFE',

      headerText: "#000000",
      headerDescr: "#959595",
      subText: "#3C3C3C",
      contrastText: "#FFFFFF",
      
      background: "#FFFFFF",
      backgroundEssential: "#F2F1F6",
      diaryDay: '#222222',
      inputBackground: '#ECECEC',
      islandBackground: "#111111",
      suggestionIslandBackground: "#BDBDBD",
      
      continueButton: "#000000",
      grayTextButton: "#6D6D6D",
      grayText: "#807F85",

      border: "#CBCBCB",

      
      mainDRK: '#0B84FE',

      headerTextDRK: "#FFFFFF",
      headerDescrDRK: "#959595",
      subTextDRK: "#959595",
      contrastTextDRK: "#000000",
      
      backgroundDRK: "#1C1C1E",
      backgroundEssentialDRK: "#131313",
      diaryDayDRK: '#29292C',
      inputBackgroundDRK: '#1F1F21',
      islandBackgroundDRK: "#FFFFFF",
      tasksBackgroundDRK: "#282828",
      suggestionIslandBackgroundDRK: "#404040",

      continueButtonDRK: "#FFFFFF",
      grayTextButtonDRK: "#B5B5B5",

      borderDRK: "#484848"
    },
    screens: {
      "sm": { 'raw': '(min-height: 640px)' },
      "md": { 'raw': '(min-height: 768px)' },
      "lg": { 'raw': '(min-height: 1024px)' },
      "xl": { 'raw': '(min-height: 1280px)' },
    }
  },
  plugins: [],
}
