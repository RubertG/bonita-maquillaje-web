import { Instagram, Location, Store, Tiktok, Whatsapp } from "../common/icons";
import { SocialButton } from "./social-button";

interface Props {
  className?: string;
}

export function SocialButtonContainer({
  className
}: Props) {
  return (
    <section
      className={`w-full grid grid-cols-1 gap-3 max-w-[26rem] mx-auto ${className}`}
    >
      <SocialButton
        href="https://www.instagram.com/maquillajebonita_/"
      >
        <Instagram className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5" />
        <p className="w-full">Instagram</p>
      </SocialButton>
      <SocialButton
        href="https://api.whatsapp.com/send?phone=573137443132&text=Hola%21%20vengo%20de%20la%20p%C3%A1gina%20web%20%F0%9F%91%8B"
      >
        <Whatsapp className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5" />
        <p className="w-full">Whatsapp</p>
      </SocialButton>
      <SocialButton
        href="https://api.whatsapp.com/send?phone=573137443132&text=Hola%21%20vengo%20de%20la%20p%C3%A1gina%20web%20%F0%9F%91%8B"
      >
        <Tiktok className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5" />
        <p className="w-full">Tiktok</p>
      </SocialButton>
      <SocialButton
        href="https://maps.app.goo.gl/qq9yRmDhxW7KYDT7A"
      >
        <Location className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5" />
        <p className="w-full">Ubicación</p>
      </SocialButton>
      <SocialButton
        href="https://drive.google.com/file/d/1WyERw4lUwIBXIxBkqq8jUSa7zdn09b-k/view"
      >
        <Store className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5" />
        <p className="w-full">Catálogo</p>
      </SocialButton>
    </section>
  )
}
