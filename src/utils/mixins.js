export const descriptionLengthFilter = {
  filters: {
    descriptionLength(description) {
      if (description.length > 80) {
        return description.substr(0, 80) + '...'
      } else {
        return description
      }
    }
  }

}