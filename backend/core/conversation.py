from sqlalchemy.orm import Session

import models


class ConversationManager:
    """
    Stores and retrieves conversation history
    from the database.
    """

    def add_message(
        self,
        db: Session,
        project_id: int,
        role: str,
        message: str
    ):

        chat = models.ChatMessage(
            project_id=project_id,
            role=role,
            message=message
        )

        db.add(chat)
        db.commit()

    def get_history(
        self,
        db: Session,
        project_id: int,
        limit: int = 10
    ):

        return (
            db.query(models.ChatMessage)
            .filter(
                models.ChatMessage.project_id == project_id
            )
            .order_by(models.ChatMessage.id.asc())
            .limit(limit)
            .all()
        )

    def clear(
        self,
        db: Session,
        project_id: int
    ):

        (
            db.query(models.ChatMessage)
            .filter(
                models.ChatMessage.project_id == project_id
            )
            .delete()
        )

        db.commit()