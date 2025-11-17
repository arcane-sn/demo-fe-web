import { Container } from "@/components/common/container";
import { Fragment } from "react";
import { DummyPostForm } from "../components/dummy-post-form";

const DummyPostPage = () => {
  return (
    <Fragment>
      <Container>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Create New Product</h1>
            <p className="text-sm text-muted-foreground">
              Add a new product to the DummyJSON database
            </p>
          </div>

          <DummyPostForm />
        </div>
      </Container>
    </Fragment>
  );
};

export default DummyPostPage;
