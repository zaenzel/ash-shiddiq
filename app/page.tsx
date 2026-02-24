import { ROUTES } from "@/shared/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href={ROUTES.LOGIN}>Login</Link>
    </div>
  );
}
