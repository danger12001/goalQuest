ALTER TABLE `toDo`
  ADD CONSTRAINT `toDo_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
