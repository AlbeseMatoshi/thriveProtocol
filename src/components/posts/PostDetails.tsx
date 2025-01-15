import {PostData} from "@/utils/api/interfaces/PostData.ts";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useLocalStorage} from "usehooks-ts";
import {toast} from "@/hooks/use-toast.ts";
import {useState} from "react";
import PostAPI from "@/utils/api/PostAPI.ts";
import {CheckCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
export const PostDetails = ({post}: { post: PostData }) => {

    const [localPostData, setLocalPostData, removePostLocalData] = useLocalStorage<PostData | undefined>('post-' + post.id, undefined);

    const mutatedPost = localPostData ?? post;
    const formSchema = z.object({
        id: z.number(),
        title:z.string(),
        body:z.string(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            id: mutatedPost.id,
            title: mutatedPost.title,
            body: mutatedPost.body,
        }
    });
    const {handleSubmit, control, formState, reset} = form;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        PostAPI.update(data as PostData).then(() => {
            toast({
                action: (
                    <CheckCircleIcon className="mr-2 text-green-500 w-6"/>
                ),
                key: post.id,
                title: "Success",
                description: 'Successfully updated post',
                duration: 3000,
                variant: 'success'
            });
            removePostLocalData();
            setIsDirty(false);
        }).catch(err => {
            toast({
                action: (
                    <XMarkIcon className="mr-2 text-red-500 w-6"/>
                ),
                title: "Error",
                description: "Failed to update the post. " + (err?.message ?? ""),
                duration: 3000,
                variant: "error",
            });
        }).finally(() => {
            reset(data as PostData, {keepIsSubmitted: false, keepDirty: false});
        });
    }

    const [isDirty, setIsDirty] = useState(false);

    const saveAsDraft = (data: z.infer<typeof formSchema>) => {
        setLocalPostData(data as PostData);
        setIsDirty(false);
    }

    return (

        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Id</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                                    <FormField
                                        control={control}
                                        name="id"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="post id"
                                                           disabled={true}
                                                           onInput={() => setIsDirty(true)} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                                    <FormField
                                        control={control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Thrive coin is the best coin"
                                                           onInput={() => setIsDirty(true)} {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the post title
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Body</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                                    <FormField
                                        control={control}
                                        name="body"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about your post"
                                                        className="resize-none"
                                                        rows={10}
                                                        onInput={() => setIsDirty(true)} {...field}
                                                    /> </FormControl>
                                                <FormDescription>
                                                    Enter your post description.
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className={'flex gap-2 justify-end'}>
                    {(formState.isDirty || localPostData != undefined) && (
                        <>
                            <Button type="button" variant={'destructive'} onClick={() => {
                                removePostLocalData();
                                reset(post);
                            }}>Discard draft</Button>
                            <Button type="button" variant={'outline'} onClick={handleSubmit(saveAsDraft)}>
                                {isDirty ? 'Save as draft' : 'Saved as draft'}
                            </Button>
                        </>
                    )}
                    <Button disabled={!(formState.isDirty || localPostData != undefined)} type="submit">Submit</Button>
                </div>
            </form>
        </Form>

    )
}