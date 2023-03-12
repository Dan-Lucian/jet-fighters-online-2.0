import { createContext, useContext, useState } from 'react';
import { isNull } from 'utils/generalTypeUtils';

// TODO: create an enum for stateApp
// TODO: refactor this
interface IDataGlobal {
  isOwnerLobby: boolean;
  name: string;
  stateApp: string;
  msgPopup: string | null;
  pathBeforeLogin: string | null;
}

type TypeContext = [IDataGlobal, React.Dispatch<React.SetStateAction<IDataGlobal>>];

const valueDefault: IDataGlobal = {
  isOwnerLobby: false,
  name: 'Anon',
  stateApp: 'preLobby',
  msgPopup: null,
  pathBeforeLogin: null,
};

const ContextGlobal = createContext<TypeContext | null>(null);
ContextGlobal.displayName = 'ContextGlobal';

const ProviderGlobal = (props: any) => {
  const dataGlobal = useState(valueDefault);

  return <ContextGlobal.Provider value={dataGlobal} {...props} />;
};

const useContextGlobal = () => {
  const dataGlobal = useContext(ContextGlobal);

  if (isNull(dataGlobal)) {
    throw new Error('useContextGlobal must be used within ProviderGlobal');
  }

  return dataGlobal;
};

// stateApp has the following possible values
// preLobby, lobby, countdown, game, gameOver

export { ProviderGlobal, useContextGlobal };
