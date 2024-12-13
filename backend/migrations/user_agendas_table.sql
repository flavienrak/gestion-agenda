CREATE TABLE IF NOT EXISTS user_agenda (
    user_id INT NOT NULL,
    agenda_id INT NOT NULL,
    PRIMARY KEY (user_id, agenda_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (agenda_id) REFERENCES agendas(id) ON DELETE CASCADE
);