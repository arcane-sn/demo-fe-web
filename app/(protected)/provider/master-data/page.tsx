"use client";
import { ToolbarDescription } from "@/app/components/partials/common/toolbar";
import { Container } from "@/components/common/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
  ToolbarTitle,
} from "@/components/common/toolbar";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import React from "react";
import { ProviderMasterDataTable } from "./components/table/provider-master-data-table";
import ModalCreateProvider from "./components/modals/modal-create-provider";
import ModalEditProvider from "./components/modals/modal-edit-provider";
import { ModalSubmit } from "@/components/shared/modals/modal-submit";
import { useMasterDataStore } from "./hooks/useMasterDataStore";
import { MOCK_PROVIDER_MASTER_DATA } from "./core/_consts";

const MasterData = () => {
  // const [isModal, setIsModal] = useState(IsModalMasterData);

  const { setModal, isModal, setIsModal } = useMasterDataStore();
  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarTitle>Master Data</ToolbarTitle>
            <ToolbarDescription>Manage your master data</ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="primary" onClick={() => setModal("create", true)}>
              <CirclePlus />
              Create New Provider
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <ProviderMasterDataTable data={MOCK_PROVIDER_MASTER_DATA} />
      </Container>
      <ModalCreateProvider
        open={isModal.create}
        onOpenChange={(value) => setModal("create", value)}
        onSubmit={() => {
          setIsModal({ ...isModal, create: false, confirmationCreate: true });
        }}
      />
      <ModalSubmit
        open={isModal.confirmationCreate}
        onOpenChange={(value) => setModal("confirmationCreate", value)}
        title="Add Confirmation"
        imageSrc="/media/illustrations/29.svg"
        imageAlt="Confirmation illustration"
        message="Do You Want to Create This Provider?"
        description="Please ensure all the provider data are valid"
        buttonText="Create Provider"
        onButtonClick={() =>
          setIsModal({
            ...isModal,
            confirmationCreate: false,
            hasCreated: true,
          })
        }
      />
      <ModalSubmit
        open={isModal.hasCreated}
        onOpenChange={(value) => setModal("hasCreated", value)}
        title="Provider Created"
        imageSrc="/media/illustrations/28.svg"
        imageAlt="Success illustration"
        message="Provider Created Successfully!"
        description="The provider has been successfully created and is now available for merchant channel routing"
        buttonText="Okay!"
      />
      <ModalEditProvider
        open={isModal.edit}
        onOpenChange={(value) => setIsModal({ ...isModal, edit: value })}
        onSubmit={() => {
          setIsModal({ ...isModal, edit: false, confirmationEdit: true });
        }}
      />
      <ModalSubmit
        open={isModal.confirmationEdit}
        onOpenChange={(value) => setModal("confirmationEdit", value)}
        title="Update Confirmation"
        imageSrc="/media/illustrations/29.svg"
        imageAlt="Confirmation illustration"
        message="Do You Want to Save This Provider Changes?"
        description="Please ensure all provider details are valid. Once saved, the changes will affect all merchants using this provider (credentials changes only, default pricing and limit will not affect existing configuration)"
        buttonText="Confirm and Save Changes"
        onButtonClick={() => {
          setIsModal({ ...isModal, confirmationEdit: false, hasEdited: true });
        }}
      />
      <ModalSubmit
        open={isModal.hasEdited}
        onOpenChange={(value) => setModal("hasEdited", value)}
        title="Provider Updated"
        imageSrc="/media/illustrations/28.svg"
        imageAlt="Success illustration"
        message="Provider Has Been Updated"
        description="The provider has been successfully updated"
        buttonText="Okay!"
        onButtonClick={() => {
          setIsModal({ ...isModal, hasEdited: false, confirmationEdit: false });
        }}
      />
    </>
  );
};

export default MasterData;
