"use client"
 
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { ChevronRightCircle, ChevronLeftCircle } from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormState
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea";


const questions = [
  "Peter Quill in Guardians of the Galaxy was born in which U.S. state?",
  "Who is the president of India?"
];

const formSchema = z.object({
  thought: z
    .string()
    .min(10, {
      message: "Thought must be at least 10 characters.",
    }),
  action: z.optional(
    z.string({
      required_error: "Please select a tool"
    })),
  actionInput: z
    .string({
      required_error: "Please enter the tool's input"
    }),
  wikipedia: z.optional
    (z.string()),
  wikidata: z.optional
    (z.string()),
})

export default function Thoughts({onFormSubmit, clearFormData, formData}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finalCheck , setFinalCheck] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thought: "",
      actionInput: "",
      wikidata: "",
      wikipedia: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
    if (finalCheck) {
      console.log('here');
      resetFormFields();
      // Resetting global form data (observations)
      clearFormData();

      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onFormSubmit(values);
    }
  }

  function resetFormFields() {
    // Resetting current form data
    form.reset({thought: "", action: "", actionInput: "", wikipedia: "", wikidata: ""});
  }

  function handleNextQuestionClick() {
    if (questionIndex === questions.length -1) return;

    resetFormFields();

    // Resetting global form data (observations)
    clearFormData();

    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handlePreviousQuestionClick() {
    if (questionIndex === 0) return;

    resetFormFields();

    // Resetting global form data (observations)
    clearFormData();

    setQuestionIndex((prevIndex) => prevIndex - 1);
  }


  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({thought: "",
      action: "",
      actionInput: ""});
    }
  }, [form.formState])

  return (
    <div className="w-full max-h-[90%] min-h-[90%] overflow-auto rounded-xl border bg-card text-card-foreground shadow p-10">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl font-bold pb-2">Question #{questionIndex+1}</h3>
        <div className="flex flex-row space-x-2">
          <span className={questionIndex===0 ? 'opacity-20': 'cursor-pointer'}>
            {(!form.formState.isDirty && formData.length === 0) ? 
              <ChevronLeftCircle disabled={questionIndex===0} onClick={handlePreviousQuestionClick}/> : 
              <AlertDialog>
                <AlertDialogTrigger disabled={questionIndex===0}><ChevronLeftCircle/></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will loose any progress made in this question.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePreviousQuestionClick}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          </span>
          <span className={(questionIndex === questions.length - 1) ? 'opacity-50': 'cursor-pointer'}>
            {(!form.formState.isDirty && formData.length === 0) ? 
              <ChevronRightCircle disabled={questionIndex === questions.length - 1} onClick={handleNextQuestionClick}/> :
              <AlertDialog>
                <AlertDialogTrigger disabled={questionIndex === questions.length - 1}><ChevronRightCircle/></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will loose any progress made in this question.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNextQuestionClick}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          </span>
        </div>
      </div>
      <h2 className="text-md mt-4 mb-10">{questions[questionIndex]}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="thought"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row space-x-2 items-center justify-between">
                  <FormLabel>Thought</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Type your thought here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Come up with a thought before choosing the tool
                </FormDescription>
              </FormItem>
            )}
          />
          {!finalCheck ?
            <>
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row space-x-2 items-center justify-between">
                      <FormLabel>Choose your action</FormLabel>
                      <FormMessage />
                    </div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a tool for your action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wikiSearch">Wikipedia Search</SelectItem>
                        <SelectItem value="squall2Sparql">Convert Squall to Sparql</SelectItem>
                        <SelectItem value="getWikidataID">Get Wikidata ID</SelectItem>
                        <SelectItem value="generateSquall">Generate Squall</SelectItem>
                        <SelectItem value="runSparql">Run Sparql Query</SelectItem>
                        <SelectItem value="wikiSearchSummary">Wikipedia Search Summary</SelectItem>
                        <SelectItem value="getLabel">Get Label</SelectItem>
                        <SelectItem value="getObservation">Get Observation from LLM</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actionInput"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row space-x-2 items-center justify-between">
                      <FormLabel>Enter your input for the action</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Type your action input here"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </> :
            <>
            <FormField
              control={form.control}
              name="wikipedia"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row space-x-2 items-center justify-between">
                    <FormLabel>Wikipedia Answer</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Type your Wikipedia answer here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wikidata"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row space-x-2 items-center justify-between">
                    <FormLabel>Wikidata Answer</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Type your Wikidata answer here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            </>
          }
          <div className="bg-card rounded-lg border flex flex-row items-center justify-between p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-sm">
                Submit final answer
              </FormLabel>
              <FormDescription className="text-xs opacity-50">Enable this only if you find the answer</FormDescription>
            </div>
            <Switch checked={finalCheck} onCheckedChange={setFinalCheck}/>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}