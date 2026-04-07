"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Lead, LeadFormValues } from "@/lib/types/lead";
import { createLeadAction, deleteLeadAction, updateLeadAction } from "@/app/(app)/leads/actions";
import { LeadFormCard } from "@/components/leads/lead-form-card";
import { LeadsTable } from "@/components/leads/leads-table";
import { Modal } from "@/components/ui/modal";

type LeadsModuleProps = {
  initialLeads: Lead[];
};

export function LeadsModule({ initialLeads }: LeadsModuleProps) {
  const router = useRouter();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedLead(null);
  }, []);

  const openCreateModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback((values: LeadFormValues, currentLead?: Lead | null) => {
    setFeedback(null);

    startTransition(async () => {
      const result = currentLead
        ? await updateLeadAction({ id: currentLead.id, ...values })
        : await createLeadAction(values);

      setFeedback(result.message);

      if (result.success) {
        closeModal();
        router.refresh();
      }
    });
  }, [closeModal, router]);

  const handleDelete = useCallback((lead: Lead) => {
    const confirmed = window.confirm(`Deseja excluir o lead "${lead.nome}"?`);

    if (!confirmed) {
      return;
    }

    setFeedback(null);

    startTransition(async () => {
      const result = await deleteLeadAction({ id: lead.id });
      setFeedback(result.message);

      if (result.success) {
        if (selectedLead?.id === lead.id) {
          closeModal();
        }
        router.refresh();
      }
    });
  }, [closeModal, router, selectedLead]);

  return (
    <div className="space-y-6">
      {feedback ? (
        <div className="rounded-2xl border border-brand-300/50 bg-white/80 px-4 py-3 text-sm text-brand-600 shadow-[0_14px_24px_-24px_rgba(17,17,17,0.16)]">
          {feedback}
        </div>
      ) : null}

      <LeadsTable
        leads={initialLeads}
        onCreate={openCreateModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={selectedLead ? "Editar lead" : "Novo lead"}
        description={
          selectedLead
            ? "Atualize os dados do contato e acompanhe o andamento comercial."
            : "Cadastre um novo lead para manter a base da clínica sempre organizada."
        }
      >
        <LeadFormCard
          selectedLead={selectedLead}
          isPending={isPending}
          onSubmit={handleSubmit}
          onCancelEdit={closeModal}
        />
      </Modal>
    </div>
  );
}
