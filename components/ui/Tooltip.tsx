import { ReactElement, cloneElement, isValidElement } from "react";

interface TooltipUniversalProps {
  texto: string;
  children: ReactElement<{ className?: string }>;
  posicion?: "left" | "right" | "top" | "bottom";
}

export function TooltipUniversal({
  texto,
  children,
  posicion = "top",
}: TooltipUniversalProps) {
  const posicionClase = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const originalClassName = children.props.className ?? "";

  const childWithGroup = cloneElement(children, {
    className: `group relative ${originalClassName}`,
  });

  return (
    <div className="inline-block relative">
      {childWithGroup}
      <span
        className={`absolute ${posicionClase[posicion]} 
          px-2 py-1 text-xs 
          bg-black text-white rounded 
          opacity-0 group-hover:opacity-100 
          transition duration-200 
          z-50 whitespace-nowrap pointer-events-none`}
      >
        {texto}
      </span>
    </div>
  );
}
