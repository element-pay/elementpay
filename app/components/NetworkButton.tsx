import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import type { NetworkButtonProps } from "../types";

export const NetworkButton = ({
  network,
  logo,
  alt,
  selectedNetwork,
  handleNetworkChange,
  disabled = false,
}: NetworkButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    className={`relative flex items-center justify-center gap-2 rounded-full px-3 py-2.5 ${
      selectedNetwork === network
        ? "border border-[#F0B429]"
        : "border border-gray-300 dark:border-[#F0B429]"
    } disabled:cursor-not-allowed disabled:opacity-70`}
    
    onClick={() => handleNetworkChange(network)}
  >
    <Image src={logo} width={0} height={0} alt={alt} className="h-auto w-4" />
    <p>
      {
        {
          base: "Base",
          arbitrum: "Arbitrum",
          polygon: "Polygon",
        }[network]
      }
    </p>

    <FaCircleCheck
      className={`absolute -right-1 top-0 rounded-full border border-white bg-white text-[#F0B429] transition-opacity dark:border-neutral-900 dark:bg-neutral-900 ${
        selectedNetwork === network ? "opacity-100" : "opacity-0"
      }`}
    />

  </button>
);
