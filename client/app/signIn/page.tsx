"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập địa chỉ email")
      .min(6, "Email tối thiếu 6 ký tự"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiếu 6 ký tự"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    setMessage("");
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          setMessage("Tài khoản hoặc mật khẩu không đúng!");
        }
        const nextUrl = searchParams.get("next");
        router.push(nextUrl ?? "/");
        router.refresh();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="min-h-screen">
      <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-screen">
        <div className="container z-1">
          <div className="flex flex-wrap -mx-3">
            <div className="flex flex-col w-full max-w-full px-12 mx-auto flex-0 md:w-8/12 lg:w-6/12 xl:w-5/12">
              <div className="grid grid-flow-row w-full gap-4">
                <h3 className="relative text-transparent bg-clip-text bg-gradient-cyan z-1 font-bold text-2xl uppercase">
                  Chào mừng trở lại
                </h3>
                <p className="font-normal text-slate-500">
                  Nhập email và mật khẩu của bạn để đăng nhập
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 w-full"
                >
                  <Alert
                    variant="destructive"
                    className={`${
                      message !== "" ? "" : "hidden"
                    } border-2 border-rose-600 text-rose-600`}
                  >
                    <AlertCircle className="h-4 w-4 " />
                    <AlertTitle className="text-rose-600">{message}</AlertTitle>
                  </Alert>
                  <div>
                    <label className="block mb-1 font-semibold text-slate-500">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      {...register("email")}
                      className={
                        (errors.email ? "border-rose-600" : "") +
                        " w-full px-4 py-2.5 rounded border-2 focus:border-sky-500 "
                      }
                    />
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.email?.message}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-slate-500">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        {...register("password")}
                        className={
                          (errors.password ? "border-rose-600" : "") +
                          " w-full px-4 py-2.5 rounded border-2 focus:border-sky-500 "
                        }
                      />
                      <button
                        type="button"
                        title="Hiển thị mật khẩu"
                        className="absolute w-[40px] z-10 right-1 top-0 bottom-0 p-3 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </button>
                    </div>
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <label>
                      <input
                        type="checkbox"
                        className="form-checkbox color-black focus:border-slate-700 focus:bg-sky-500 focus:ring-0 focus:ring-offset-2 focus:ring-sky-500"
                      />
                      <span className="ml-2 cursor-pointer">Ghi nhớ</span>
                    </label>
                    <div>
                      <Link href="#" className="text-normal">
                        Quên mật khẩu
                      </Link>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded">
                    <Button
                      type="submit"
                      className="rounded w-full uppercase bg-gradient-cyan   text-white py-3 hover:scale-[1.05] transition-all"
                      disabled={isLoading}
                    >
                      <Loader2
                        className={`${
                          !isLoading ? "hidden" : ""
                        } mr-2 h-4 w-4 animate-spin`}
                      />
                      Đăng nhập
                    </Button>
                  </div>
                  <div className="">
                    <span className="text-sm font-normal text-slate-500	">
                      Chưa đăng ký?{" "}
                    </span>
                    <Link href="/sign-up" className="text-normal">
                      Tạo tài khoản
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full max-w-full px-3 my-auto shrink-0 md:flex-0 md:w-6/12">
              <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-[10deg] -right-40 rounded-bl-xl md:block ">
                <div className="skew-x-[10deg] bg-cover -ml-16 h-full absolute inset-x-0 top-0 bg-[url('/curved1.jpg')]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
