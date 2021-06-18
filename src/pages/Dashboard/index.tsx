import React, { FormEvent, useEffect, useState } from 'react';
import { api } from '../../services';

interface ITimes {
  ano: string;
  sede: string;
  campeao: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const [times, setTimes] = useState([]);
  const [ano, setAno] = useState('');
  const [sede, setSede] = useState('');
  const [campeao, setCampeao] = useState('');

  async function getTimes() {
    const { data } = await api.get('/worldcup');
    setTimes(data);
  }

  useEffect(() => {
    getTimes();
  }, []);

  async function sendData(event: FormEvent) {
    event.preventDefault();
    await api.post('/worldcup', {
      ano: ano,
      sede: sede,
      campeao: campeao,
    });
    setAno('');
    setSede('');
    setCampeao('');
    getTimes();
  }

  async function handleDelete(id: string) {
    await api.delete(`/worldcup/${id}`);

    getTimes();
  }

  return (
    <div className="page">
      <form className="cadastro" onSubmit={sendData}>
        <label>Ano:</label>
        <input
          name="ano"
          placeholder="Digite o ano"
          type="text"
          value={ano}
          onChange={(event) => setAno(event.target.value)}
        />
        <label>Sede:</label>
        <input
          name="sede"
          type="text"
          placeholder="Digite a sede"
          value={sede}
          onChange={(event) => setSede(event.target.value)}
        />
        <label>Campeão:</label>
        <input
          name="campeao"
          type="text"
          placeholder="Digite o time campeao"
          value={campeao}
          onChange={(event) => setCampeao(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Sede</th>
            <th>Campeao</th>
            <th colSpan={2}>Opções</th>
          </tr>
        </thead>

        <tbody>
          {times.map((time: ITimes) => (
            <tr key={time.id}>
              <td>{time.ano}</td>
              <td>{time.sede}</td>
              <td>{time.campeao}</td>
              <td>
                <a href={`/details/${time.campeao}`}>Detalhes</a>
              </td>
              <td>
                <button
                  className="Excluir"
                  onClick={() => handleDelete(time.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
