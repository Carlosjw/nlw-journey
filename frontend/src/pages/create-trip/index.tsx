import { ArrowRight, UserRoundPlus } from "lucide-react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestionAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
    // CRIANDO NAVEGAÇÃO
    const navigate = useNavigate();

    // MANIPULANDO ESTADOS
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState([
        'carlos.ti.infor@gmail.com'
    ]);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    function openGuestInput() {
        setIsGuestInputOpen(true)
    }

    function closeGuestInput() {
        setIsGuestInputOpen(false)
    }

    // EXIBINDO MODAL
    function openGuestModal() {
        setIsGuestModalOpen(true)
    }

    // FECHAR MODAL
    function closeGuestModal() {
        setIsGuestModalOpen(false)
    }

    // EXIBINDO MODAL DE CONFIRMAÇÃO
    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    // FECHAR MODAL DE CONFIRMAÇÃO
    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    //ADICIONANDO EMAILS
    function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputData = new FormData(event.currentTarget);
        const email = inputData.get('email')?.toString();
        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return (
                alert('Email já convidado!')
            )
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email
        ])

        event.currentTarget.reset()
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove);
        setEmailsToInvite(newEmailList)
    }

    // CHAMANDO PÁGINA DE CRIAÇÃO DE VIAGEM
    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        navigate('/trips/123')
    }
    return (

        <div className="h-screen flex items-center justify-center bg-bgblocks bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="Logo Plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className="space-y-4">

                    <DestionAndDateStep
                        closeGuestInput={closeGuestInput}
                        isGuestInputOpen={isGuestInputOpen}
                        openGuestInput={openGuestInput}
                    />

                    {isGuestInputOpen && (
                        <InviteGuestsStep
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestModal={openGuestModal}
                        />
                    )}
                </div>

                <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
            </div>
            {isGuestModalOpen && (
                <InviteGuestsModal
                    emailsToInvite={emailsToInvite}
                    addEmailToInvite={addEmailToInvite}
                    closeGuestModal={closeGuestModal}
                    removeEmailFromInvites={removeEmailFromInvites}
                />
            )}

            {/* MODAL CONFIRMAR CRIAÇÃO DE VIAGEM */}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                />
            )}

        </div>
    )
}

