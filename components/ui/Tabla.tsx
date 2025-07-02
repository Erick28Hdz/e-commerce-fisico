// components/ui/Tabla.tsx
import React from "react";

interface Props {
  titulo?: string;
  columnas?: string[];
  filas?: string[][];
  lista?: string[];
  acciones?: React.ReactNode[];
}

export const Tabla: React.FC<Props> = ({ titulo, columnas, filas, lista, acciones }) => {
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
        <div className="w-full overflow-x-auto rounded-lg border-2 border-[var(--color-principal)]">
          <table className="min-w-full border-collapse text-sm">
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
                      textAlign: "center",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {columna}
                  </th>
                ))}
                {acciones && <th>Acciones</th>}
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
                  {acciones && (
                    <td>
                      <div className="flex justify-center items-center gap-2 px-2 py-1">
                        {acciones[i]}
                      </div>
                    </td>
                  )}
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
