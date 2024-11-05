import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2 bg-[#0F0E11]">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[650px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mr-2 h-11 bg-[#0F0E11] text-base"
        >
          <LogInIcon />
          Fazer login ou criar conta
        </Button>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Background LoginPage"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}