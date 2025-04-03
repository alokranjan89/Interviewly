"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { optional, z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";  // ✅ Import properly

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-in' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();  // ✅ Call `useRouter()` correctly

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        toast.success('Account created successfully. Please sign in.')
        router.push('/sign-in')  // ✅ Navigate to sign-in page after signup
      } else {
        toast.success('Signed in successfully.')
        router.push('/')  // ✅ Navigate to homepage after sign-in
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">InterViewly</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

            {!isSignIn && (
              <FormField control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name" />
            )}
            <FormField control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormField control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your password"
              type="password"
            />

            <Button 
              className="btn" 
              type="submit"
              onClick={() => router.push('/')}  // ✅ Fallback navigation to homepage
            >
              {isSignIn ? 'sign-in ' : 'Create an Account'}
            </Button>

          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-user-primary ml-1">
            {isSignIn ? 'sign-up' : 'sign-in'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
