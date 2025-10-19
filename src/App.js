import { useState } from "react";
import "./App.css";

const estados = [
  { uf: "AC", destino: 0.17, tipo: "porFora" },
  { uf: "AL", destino: 0.18, tipo: "ambos" },
  { uf: "AM", destino: 0.18, tipo: "porFora" },
  { uf: "AP", destino: 0.17, tipo: "porFora" },
  { uf: "BA", destino: 0.18, tipo: "porDentro" },
  { uf: "CE", destino: 0.18, tipo: "porFora" },
  { uf: "DF", destino: 0.18, tipo: "porFora" },
  { uf: "ES", destino: 0.17, tipo: "porFora" },
  { uf: "GO", destino: 0.17, tipo: "porDentro" },
  { uf: "MA", destino: 0.18, tipo: "ambos" },
  { uf: "MG", destino: 0.18, tipo: "porDentro" },
  { uf: "MS", destino: 0.17, tipo: "porDentro" },
  { uf: "MT", destino: 0.17, tipo: "porFora" },
  { uf: "PA", destino: 0.17, tipo: "porDentro" },
  { uf: "PB", destino: 0.18, tipo: "porDentro" },
  { uf: "PE", destino: 0.18, tipo: "porDentro" },
  { uf: "PI", destino: 0.18, tipo: "porDentro" },
  { uf: "PR", destino: 0.18, tipo: "porDentro" },
  { uf: "RJ", destino: 0.18, tipo: "porDentro" },
  { uf: "RN", destino: 0.18, tipo: "porFora" },
  { uf: "RO", destino: 0.17, tipo: "porFora" },
  { uf: "RR", destino: 0.17, tipo: "porFora" },
  { uf: "RS", destino: 0.18, tipo: "porDentro" },
  { uf: "SC", destino: 0.17, tipo: "porDentro" },
  { uf: "SE", destino: 0.18, tipo: "porDentro" },
  { uf: "TO", destino: 0.18, tipo: "porDentro" },
];

const legendaTipo = {
  porDentro:
    "Este Estado utiliza o cálculo DIFAL por Dentro, ou seja, o imposto já está embutido no valor da mercadoria.",
  porFora:
    "Este Estado utiliza o cálculo DIFAL por Fora, ou seja, o imposto é somado ao valor da mercadoria.",
  ambos:
    "Este Estado permite ambos os tipos de cálculo: por Dentro e por Fora.",
};

export default function App() {
  const [ufDestino, setUfDestino] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState(null);

  const aliqOrigem = 0.12; // SP fixo

  const calcularDifal = () => {
    const estado = estados.find((e) => e.uf === ufDestino);
    if (!estado || !valor) return;

    const aliqDestino = estado.destino;
    const valorNum = parseFloat(valor);

    const difalPorFora = (aliqDestino - aliqOrigem) * valorNum;
    const difalPorDentro =
      ((aliqDestino - aliqOrigem) / (1 - aliqDestino)) * valorNum;

    setResultado({
      tipo: estado.tipo,
      porFora: difalPorFora.toFixed(2),
      porDentro: difalPorDentro.toFixed(2),
    });
  };

  return (
    <div
      className="container"
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1>Simulador de DIFAL</h1>
      <p className="sauter">Uso interno da Têxtil Sauter</p>

      <div className="origem">
        <p>
          <strong>Estado de Origem:</strong> São Paulo (SP)
        </p>
        <p>
          <strong>Alíquota vigente de ICMS:</strong> 12%
        </p>
      </div>
      <label>Estado de Destino:</label>
      <select value={ufDestino} onChange={(e) => setUfDestino(e.target.value)}>
        <option value="">Selecione</option>
        {estados.map((e) => (
          <option key={e.uf} value={e.uf}>
            {e.uf}
          </option>
        ))}
      </select>

      <label>Valor da Mercadoria (R$):</label>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <button onClick={calcularDifal}>Calcular DIFAL</button>

      {resultado && (
        <div classname="resultado">
          {resultado.tipo === "ambos" && (
            <>
              <p>
                <strong>DIFAL por Fora:</strong> R$ {resultado.porFora}
              </p>
              <p>
                <strong>DIFAL por Dentro:</strong> R$ {resultado.porDentro}
              </p>
            </>
          )}
          {resultado.tipo === "porDentro" && (
            <p>
              <strong>DIFAL por Dentro:</strong> R$ {resultado.porDentro}
            </p>
          )}
          {resultado.tipo === "porFora" && (
            <p>
              <strong>DIFAL por Fora:</strong> R$ {resultado.porFora}
            </p>
          )}
          <p style={{ fontSize: "0.875rem", color: "#555" }}>
            <em>{legendaTipo[resultado.tipo]}</em>
          </p>
        </div>
      )}
      <footer>
        <p className="rodape">Desenvolvido por: Filipe Bernardo | 2025</p>
      </footer>
    </div>
  );
}
