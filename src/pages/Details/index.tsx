import React, { useEffect, useState } from 'react';
import { api } from '../../services';
import { useRouteMatch } from 'react-router-dom';

interface ICampeao {
  campeao: string;
}

interface ITimeCampeao {
  id: string;
  ano: string;
  sede: string;
  campeao: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<ICampeao>();

  const [titulos, setTitulos] = useState<ITimeCampeao[]>([]);

  useEffect(() => {
    api.get(`/worldcup`).then(({ data }) => {
      const arr = data.filter(
        ({ campeao }: ITimeCampeao) => campeao === params.campeao,
      );
      setTitulos(arr);
    });
  }, [params]);

  return (
    <div>
      <ul>
        {titulos.map(({ id, ano, sede }) => (
          <li key={id}>
            Ano: {ano}, sede: {sede}
          </li>
        ))}
      </ul>
      <a href="/">Voltar</a>
    </div>
  );
};

export default Details;
