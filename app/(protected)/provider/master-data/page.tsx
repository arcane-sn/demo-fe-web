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
import { TableMasterData } from "./components";
import ModalCreateProvider from "./components/modals/modal-create-provider";
import { ConfirmationModal } from "@/components/common/ModalConfirmation";
import ModalEditProvider from "./components/modals/modal-edit-provider";
import { useMasterDataStore } from "./hooks/useMasterDataStore";

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
        <TableMasterData />
      </Container>
      <ModalCreateProvider
        open={isModal.create}
        onOpenChange={(value) => setModal("create", value)}
        onSubmit={() => {
          setIsModal({ ...isModal, create: false, confirmationCreate: true });
        }}
      />
      <ConfirmationModal
        open={isModal.confirmationCreate}
        onOpenChange={(value) => setModal("confirmationCreate", value)}
        onSubmit={() =>
          setIsModal({
            ...isModal,
            confirmationCreate: false,
            hasCreated: true,
          })
        }
        onCancel={() => {}}
        isLoading={false}
        headerTitle="Add Confirmation"
        bodyTitle="Do You Want to Create This Provider?"
        description="Please ensure all the provider data are valid"
        submitButtonText="Create Provider"
      />
      <ConfirmationModal
        type="created"
        open={isModal.hasCreated}
        onOpenChange={(value) => setModal("hasCreated", value)}
        headerTitle="Provider Created"
        bodyTitle="Provider Created Successfully!"
        description="The provider has been successfully created and is now available for merchant channel routing"
      />
      <ModalEditProvider
        open={isModal.edit}
        onOpenChange={(value) => setIsModal({ ...isModal, edit: value })}
        onSubmit={() => {
          setIsModal({ ...isModal, edit: false, confirmationEdit: true });
        }}
      />
      <ConfirmationModal
        open={isModal.confirmationEdit}
        onOpenChange={(value) => setModal("confirmationEdit", value)}
        onSubmit={() => {
          setIsModal({ ...isModal, confirmationEdit: false, hasEdited: true });
        }}
        headerTitle="Update Confirmation"
        bodyTitle="Do You Want to Save This Provider Changes?"
        description="Please ensure all provider details are valid. Once saved, the changes will affect all merchants using this provider (credentials changes only, default pricing and limit will not affect existing configuration)"
        submitButtonText="Confirm and Save Changes"
      />
      <ConfirmationModal
        type="created"
        open={isModal.hasEdited}
        onOpenChange={(value) => setModal("hasEdited", value)}
        onSubmit={() => {
          setIsModal({ ...isModal, hasEdited: false, confirmationEdit: false });
        }}
        headerTitle="Provider Updated"
        bodyTitle="Provider Has Been Updated"
        description="The provider has been successfully updated"
      />
    </>
  );
};

export default MasterData;
