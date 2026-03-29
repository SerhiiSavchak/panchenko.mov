import { redirect } from "next/navigation";

/** Legacy `/work` index: portfolio listing lives on the homepage (`/#works`). */
export default function WorkIndexRedirect() {
  redirect("/");
}
