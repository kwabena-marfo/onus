import Link from "next/link";

// import moment from "moment";

export default function Footer() {
  return (
    <footer className="bg-white relative bottom-0  my-5">
      <span className="block text-center text-sm text-gray-500 sm:text-center dark:text-gray-400">
        {/* © {moment().format("YYYY")}{" "} */}
        <Link href="" className="hover:underline">
          GT-Connect
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
