import React from "react";

const UseLoaded = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded;
};

export default UseLoaded;
