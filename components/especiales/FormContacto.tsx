// components/FormularioContacto.tsx
import { useState } from "react";
import FormularioBase from "../ui/Form";
import FormInput from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setStatus("error");
      return;
    }

    // Aquí podrías hacer una llamada a una API, enviar por email, etc.
    console.log("Formulario enviado:", { nombre, email, mensaje });

    setStatus("success");
    setNombre("");
    setEmail("");
    setMensaje("");

    // Resetear después de unos segundos (opcional)
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <FormularioBase onSubmit={handleSubmit}>
      <FormInput
        label="Nombre"
        value={nombre}
        onChange={setNombre}
        placeholder="Tu nombre"
        type="text"
      />
      <FormInput
        label="Correo Electrónico"
        value={email}
        onChange={setEmail}
        placeholder="correo@ejemplo.com"
        type="text"
      />
      <Textarea
        label="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
        rows={5}
      />
      <div className="flex justify-center">
        <Button type="submit">Enviar</Button>
      </div>

      {status === "success" && (
        <Alert type="success" message="Mensaje enviado correctamente." />
      )}
      {status === "error" && (
        <Alert type="error" message="Por favor completa todos los campos." />
      )}
    </FormularioBase>
  );
}
