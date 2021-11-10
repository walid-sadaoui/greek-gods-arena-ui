import React from 'react';
import { Character } from 'models/Character';

type GreekGodSelectContextProps = {
  greekGodSelected: Character | undefined;
  setGreekGodSelected: React.Dispatch<
    React.SetStateAction<Character | undefined>
  >;
};

const GreekGodSelectContext = React.createContext<
  GreekGodSelectContextProps | undefined
>(undefined);

const useGreekGodSelect = (): GreekGodSelectContextProps => {
  const greekGodSelectContext = React.useContext(GreekGodSelectContext);
  if (greekGodSelectContext === undefined)
    throw new Error(
      'useGreekGodSelect must be used within an GreekGodSelectProvider'
    );
  return greekGodSelectContext;
};

const GreekGodSelectProvider: React.FC = ({ children }) => {
  const [greekGodSelected, setGreekGodSelected] = React.useState<
    Character | undefined
  >(undefined);

  //   React.useEffect(() => {
  //     setGreekGodSelected(undefined);
  //   }, []);

  React.useEffect(() => {
    console.log('GGSelect : ', greekGodSelected);
  }, [greekGodSelected]);

  return (
    <GreekGodSelectContext.Provider
      value={{ greekGodSelected, setGreekGodSelected }}
    >
      {children}
    </GreekGodSelectContext.Provider>
  );
};

export { GreekGodSelectProvider, useGreekGodSelect };
