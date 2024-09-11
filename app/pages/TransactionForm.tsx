"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ImSpinner2 } from "react-icons/im";
import { FaRegHourglass } from "react-icons/fa6";
import { useSmartAccount } from "@biconomy/use-aa";
import { AnimatePresence, motion } from "framer-motion";
import { PiCheckCircle } from "react-icons/pi";

import {
  AnimatedComponent,
  NetworksDropdown,
  FundWalletModal,
  InputError,
  NetworkButton,
  SelectField,
  TabButton,
  Tooltip,
  fadeInOut,
  inputClasses,
  primaryBtnClasses,
  slideInDown,
  slideInOut,
} from "../components";
import { fetchSupportedTokens, formatCurrency } from "../utils";
import type { InstitutionProps, TransactionFormProps } from "../types";
import { HiOutlineInformationCircle } from "react-icons/hi";

const currencies = [
  { value: "NGN", label: "\uD83C\uDDF3\uD83C\uDDEC Nigerian Naira (NGN)" },
  {
    value: "KES",
    label: "\uD83C\uDDF0\uD83C\uDDEA Kenyan Shilling (KES)",
    disabled: true,
  },
  {
    value: "GHS",
    label: "\uD83C\uDDEC\uD83C\uDDED Ghanaian Cedi (GHS)",
    disabled: true,
  },
];

export const TransactionForm = ({
  formMethods,
  onSubmit,
  stateProps,
}: TransactionFormProps) => {
  const {
    tokenBalance,
    smartTokenBalance,
    rate,
    isFetchingRate,
    recipientName,
    isFetchingRecipientName,
    selectedNetwork,
    handleNetworkChange,
    selectedTab,
    handleTabChange,
    isFetchingInstitutions: institutionsLoading,
    institutions: supportedInstitutions,
  } = stateProps;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid, isDirty },
  } = formMethods;

  const currency = watch("currency");
  const amount = watch("amount");
  const token = watch("token");

  const account = useAccount();
  const { smartAccountAddress } = useSmartAccount();

  const rateInfo = {
    key: "rate",
    label: "Rate",
    value: `${formatCurrency(rate, currency?.toString(), currency ? `en-${currency.toString().slice(0, 2)}` : "en-NG")}/${token}`,
  };

  const feeInfo = {
    key: "eta",
    label: "Funds available in",
    value: "15s",
  };

  const renderedInfo = [rateInfo, feeInfo];

  const networks = ["base", "arbitrum", "polygon"];

  const otherNetworks = [
    {
      id: "1",
      name: "Ethereum",
      imageUrl: "/ethereum-logo.svg",
      disabled: true,
    },
    {
      id: "2",
      name: "Binance",
      imageUrl: "/binance-logo.svg",
      disabled: true,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-50 grid gap-6 bg-gray-100 py-10 font-sans text-sm text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-100"
      noValidate
    >
      <div className="grid gap-4 rounded-3xl border border-gray-300 bg-white p-4 transition-all dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          {/* Token */}
          <div className="grid flex-1 gap-2">
            <SelectField
              id="token"
              label="Token"
              options={
                fetchSupportedTokens(account.chain?.name)?.map((token) => ({
                  value: token.symbol,
                  label: token.symbol,
                })) ?? []
              }
              validation={{
                required: { value: true, message: "Token is required" },
                disabled: !account.isConnected,
              }}
              errors={errors}
              register={register}
              value={watch("token")}
              defaultValue="DAI"
              title={
                account.isConnected
                  ? "Select token to send"
                  : "Connect wallet to select token"
              }
            />
          </div>

          {/* Amount */}
          <div className="grid flex-1 gap-2">
            <label
              htmlFor="amount"
              className="font-medium text-gray-800 dark:text-gray-200"
            >
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                step="0.0001"
                {...register("amount", {
                  required: { value: true, message: "Amount is required" },
                  disabled: !account.isConnected || token === "",
                  min: {
                    value: 0.5,
                    message: `Min. amount is 0.5 ${token}`,
                  },
                  max: {
                    value: 500,
                    message: `Max. amount is 500 ${token}`,
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,4})?$/,
                    message: "Max. of 4 decimal places",
                  },
                })}
                className={`${inputClasses} border border-gray-300 bg-gray-50 pl-4 pr-14 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
                placeholder="0.5000"
                title={
                  token === ""
                    ? "Select token to enable amount field"
                    : !account.isConnected
                      ? "Connect wallet to enable amount field"
                      : "Enter amount to send"
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 dark:text-gray-400">
                {watch("token")}
              </div>
            </div>
            {errors.amount && <InputError message={errors.amount.message} />}
          </div>
        </div>

        {/* Wallet and Smart Wallet Balance */}
        <AnimatePresence mode="wait">
          {account.status === "connected" && token !== "" && (
            <AnimatedComponent
              variant={slideInDown}
              className="flex items-start justify-between rounded-2xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="grid flex-1 gap-3 p-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  Smart Wallet
                  <FundWalletModal address={smartAccountAddress} />
                </div>
                <div className="flex items-center gap-1">
                  {token && (
                    <Image
                      src={`/${String(token)?.toLowerCase()}-logo.svg`}
                      alt={`${token} logo`}
                      width={14}
                      height={14}
                    />
                  )}
                  <p className="text-gray-800 dark:text-gray-200">
                    {Math.round(smartTokenBalance * 100) / 100} {token}
                  </p>
                </div>
              </div>

              <div className="h-full w-px border border-dashed border-gray-300 dark:border-gray-700" />

              <div className="grid flex-1 gap-3 p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {account.connector.name}
                </p>
                <div className="flex items-center gap-1">
                  {token && (
                    <Image
                      src={`/${String(token)?.toLowerCase()}-logo.svg`}
                      alt={`${token} logo`}
                      width={14}
                      height={14}
                    />
                  )}
                  <p className="text-gray-800 dark:text-gray-200">
                    {Math.round(tokenBalance * 100) / 100} {token}
                  </p>
                </div>
              </div>
            </AnimatedComponent>
          )}
        </AnimatePresence>
      </div>

      {/* Recipient Details */}
      <div className="text-gray-800 dark:text-gray-200">
        <div className="flex items-center gap-1 pb-2">
          <h3 className="font-medium">
            Recipient details <span className="text-red-500">*</span>
          </h3>
          <Tooltip message="Recipient details will be encrypted onchain.">
            <HiOutlineInformationCircle className="cursor-pointer text-gray-400 hover:text-gray-500" />
          </Tooltip>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={
          !isValid || !isDirty || !account.isConnected || recipientName === ""
        }
        className={`${primaryBtnClasses} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900`}
      >
        {account.isConnected ? "Review Info" : "Connect wallet to continue"}
      </button>
    </form>
  );
};
