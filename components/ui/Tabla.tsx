// components/ui/Tabla.tsx
import React from "react";

interface Props {
  titulo?: string;
  columnas?: string[];
  filas?: string[][];
  lista?: string[];
}

export const Tabla: React.FC<Props> = ({ titulo, columnas, filas, lista }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderRadius: "0.75rem",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {titulo && (
        <h3
          style={{
            marginBottom: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "var(--color-principal)",
          }}
        >
          {titulo}
        </h3>
      )}

      {columnas && filas ? (
        <div
          style={{
            overflowX: "auto",
            border: "2px solid var(--color-principal)",
            borderRadius: "0.5rem",
            overflow: "hidden", // muy importante para el radius
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--color-principal)",
                  color: "#fff",
                }}
              >
                {columnas.map((columna, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "0.5rem 0.75rem",
                      textAlign: "left",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {columna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((fila, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor:
                      i % 2 === 0
                        ? "var(--color-bg-secondary)"
                        : "var(--color-bg-primary)",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      i % 2 === 0
                        ? "var(--color-bg-secondary)"
                        : "var(--color-bg-primary)")
                  }
                >
                  {fila.map((valor, j) => (
                    <td
                      key={j}
                      style={{
                        
                        padding: "0.5rem 0.75rem",
                        color: "var(--color-text-primary)",
                        textAlign: "center",
                      }}
                    >
                      {valor}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : lista ? (
        <ul
          style={{
            listStyle: "disc",
            paddingLeft: "1.25rem",
            fontSize: "0.875rem",
            color: "var(--color-text-primary)",
          }}
        >
          {lista.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
