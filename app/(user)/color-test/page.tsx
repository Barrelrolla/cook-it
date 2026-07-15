import ColorTest from "@/app/components/colorTest";
import { Badge, Button } from "@barrelrolla/react-components-library";

export default function ColorTestPage() {
  return (
    <main>
      <ColorTest />
      <div className="flex flex-row flex-wrap gap-2">
        <Button color="main">main</Button>
        <Button color="primary">primary</Button>
        <Button color="secondary">secondary</Button>
        <Button color="accent">accent</Button>
        <Button color="info">info</Button>
        <Button color="success">success</Button>
        <Button color="warning">warning</Button>
        <Button color="error">error</Button>
      </div>
      <div className="flex flex-row flex-wrap gap-2 my-2">
        <Badge color="main">main</Badge>
        <Badge color="primary">primary</Badge>
        <Badge color="secondary">secondary</Badge>
        <Badge color="accent">accent</Badge>
        <Badge color="info">info</Badge>
        <Badge color="success">success</Badge>
        <Badge color="warning">warning</Badge>
        <Badge color="error">error</Badge>
      </div>
      <div>
        <p className="bg-main text-main-content">main</p>
        <p className="bg-primary text-primary-content">primary</p>
        <p className="bg-secondary text-secondary-content">secondary</p>
        <p className="bg-accent text-accent-content">accent</p>
        <p className="bg-info text-info-content">info</p>
        <p className="bg-success text-success-content">success</p>
        <p className="bg-warning text-warning-content">warning</p>
        <p className="bg-error text-error-content">error</p>
      </div>
      <div className="mt-2">
        <p className="bg-main text-main-content">main</p>
        <p className="bg-main text-primary-content">primary</p>
        <p className="bg-main text-secondary-content">secondary</p>
        <p className="bg-main text-accent-content">accent</p>
        <p className="bg-main text-info-content">info</p>
        <p className="bg-main text-success-content">success</p>
        <p className="bg-main text-warning-content">warning</p>
        <p className="bg-main text-error-content">error</p>
      </div>
    </main>
  );
}
