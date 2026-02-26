"use client"

import React, { createContext, useContext, useState } from "react"
import { AuthModal } from "@/components/shared/auth/auth-modal"

interface ModalContextType {
    openLogin: () => void
    openRegister: () => void
    openForgotPassword: () => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState<"login" | "register" | "forgot-password">("login")

    const openLogin = () => {
        setView("login")
        setIsOpen(true)
    }

    const openRegister = () => {
        setView("register")
        setIsOpen(true)
    }

    const openForgotPassword = () => {
        setView("forgot-password")
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider value={{ openLogin, openRegister, openForgotPassword, closeModal }}>
            {children}
            <AuthModal
                isOpen={isOpen}
                onClose={closeModal}
                view={view}
                onViewChange={setView}
            />
        </ModalContext.Provider>
    )
}

export function useAuthModal() {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error("useAuthModal must be used within a ModalProvider")
    }
    return context
}
