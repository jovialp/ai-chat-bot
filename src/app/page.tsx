import SendIcon from "@/assets/icons/SendIcon";
import Form from "@/components/Form";
import TextInput from "@/components/TextInput";

export default function Home() {
  return (
    <main>
      <div className="container pt-4">
        <h1 className="text-center text-4xl font-bold">AI Chat-bot</h1>
      </div>
      <div className="fixed w-full p-4 inset-x-0 bottom-0">
        <Form>
          <TextInput labelName="Send a message" name="search">
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <SendIcon />
            </button>
          </TextInput>
        </Form>
      </div>
    </main>
  );
}
